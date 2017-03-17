var riot = require('riot');
var fa_root = require('../tags/fa-root.tag');
var fa_tasks = require('../tags/fa-tasks.tag');
var fa_task_edit = require('../tags/fa-task-edit.tag');
var fa_task_modal = require('../tags/fa-task-modal.tag');

var obs = riot.observable();
riot.mixin('obs', obs);

riot.mount('*');
