'use strict';

var _     = require("underscore");

function add_names(d) {
  _.keys(d).forEach((k) => {
    if (!_.has(d[k], "name")) {
      d[k].name = k;
    }
  });
}

function run_inherit(d) {
  var result = {};
  _.keys(d).forEach((k) => {
    var i = d[k];
    var chain = [i];
    while (_.has(i, "inherit")) {
      var tgt = i.inherit;
      if (typeof tgt === 'string') {
        if (_.has(d,tgt))
          tgt = d[tgt];
        else
          console.error(tgt, "not found");
      }
      chain.unshift(tgt);
      i = tgt;
    }
    //console.log(chain.map((i) => i.name));
    result[k] = Object.assign({}, ...chain);
    delete result[k].inherit;
  });
  return result;
}

function trim_obj(obj) {
  if (!Array.isArray(obj) && typeof obj != 'object') return obj;
  return Object.keys(obj).reduce(function(acc, key) {
    acc[key] = typeof obj[key] == 'string'? obj[key].trim() : trim_obj(obj[key]);
    return acc;
  }, Array.isArray(obj)? []:{});
}

var boards   = require("./data_boards.js");
var shields  = require("./data_shields.js");
var examples = require("./data_examples.js");

add_names(boards);
add_names(shields);
add_names(examples);

boards = run_inherit(boards);
shields = run_inherit(shields);

function generate(board, shield, example, auth_token) {
  if (boards[board] === undefined) return "No such board";
  if (shields[shield] === undefined) return "No such shield";
  if (examples[example] === undefined) return "No such example";
  
  var data = {
    auth:    auth_token || "YourAuthToken",
    defines: "\b",
    board : {
      comment: "\b",
      defs: "\b",
      inc:  "\b",
      glob: "\b",
      init: "\b",
      loop: "\b"
    },
    example: {
      comment: "\b",
      defs: "\b",
      inc:  "\b",
      glob: "\b",
      init: "\b",
      loop: "\b"
    }
  };
  _.extend(data, boards[board]);
  _.extend(data.board, shields[shield]);
  _.extend(data.example, examples[example]);
  
  if (("need_serial" in data.board) && !("serial_dat" in data)) {
    data.serial_dat = "SwSerial";

    data.board.inc = `
#include <SoftwareSerial.h>
SoftwareSerial SwSerial(10, 11); // RX, TX
${data.board.inc}`;

  }
  
  if ("swap_serial" in data.board) {
    var tmp = data.serial_dbg;
    data.serial_dbg = data.serial_dat;
    data.serial_dat = tmp;
  }

  data = trim_obj(data);
  //return JSON.stringify(data);
  
  var code = data.template;
  
  for (var i = 0; i < 5; i++) {
    var t = _.template(code);
    code = t(data);
    if (code.indexOf("<%") == -1) {
      break;
    }
  }

  code = code.replace(/\r\n/g, "\n");
  code = code.replace(/\n[\s]*[\b]\n/g, "\n");
  code = code.replace(/[\b]/g,"");
  //code = code.replace(/\n\n\n/g, "\n\n");
  code += "\n\n";

  return code;
}


function getBoardShields(board) {
  board = boards[board];
  var result = [];
  if (_.has(board, "builtin")) {
    result.push("--- Built In");
    Array.prototype.push.apply(result, board.builtin);
  }

  var all_shields = _.keys(shields);

  if (_.has(board, "exclude")) {
    var regexs = board.exclude;
    all_shields = all_shields.filter(function (text) {
      if (text.startsWith("---")) return true;
      return !regexs.some(function (regex) {
        return regex.test(text);
      });
    });
  }
  all_shields = all_shields.filter((k) => (shields[k].embedded !== true));
  Array.prototype.push.apply(result, all_shields);

  return result;
}

/*************************************************/
/*module.exports.boards = boards
module.exports.shields = shields
module.exports.examples = examples*/

module.exports.listBoards   = function() { return Object.keys(boards)   };
module.exports.listShields  = function() { return Object.keys(shields)  };
module.exports.listExamples = function() { return Object.keys(examples) };

module.exports.getBoardShields = getBoardShields;
module.exports.generate = generate;
