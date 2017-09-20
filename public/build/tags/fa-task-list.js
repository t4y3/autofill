
riot.tag2('fa-task-list', '<h1>List</h1> <table if="{tasks.length}"> <colgroup> <col width="80%"> <col width="10%"> <col width="10%"> </colgroup> <tbody> <tr each="{tasks}"> <td><a href="#" data-task-id="{id}" onclick="{editTask}">{name}</a></td> <td><a class="fa-button button button-small" href="#" data-task-id="{id}" onclick="{runTask}">Run</a></td> <td><a class="fa-button button button-red button-small" href="#" data-task-id="{id}" onclick="{deleteTask}">Delete</a></td> </tr> <tr> <td></td> <td></td> <td><a class="fa-button button button-small" href="#" onclick="{addTask}">Add</a></td> </tr> </tbody> </table> <div class="empty-text"> <p class="empty-text__text">タスクがありません</p> </div>', 'fa-task-list,[data-is="fa-task-list"]{ display: block; } fa-task-list .fa-button,[data-is="fa-task-list"] .fa-button{ width: 100%; } fa-task-list .empty-text,[data-is="fa-task-list"] .empty-text{ padding: 20px; background-color: #fafbfc; border: 1px solid #e1e4e8; border-radius: 3px; box-shadow: inset 0 0 10px rgba(27,31,35,0.05); } fa-task-list .empty-text .empty-text__text,[data-is="fa-task-list"] .empty-text .empty-text__text{ margin: 0; text-align: center; }', '', function(opts) {
    this.on('before-mount', () => {
      this.mixin('faObs');
      this.tasks = [];

      getTaskList();
    });

    this.addTask = (e) => {
      this.faObs.trigger('change_scene', 'add');
    };

    this.editTask = function(e) {
      this.faObs.trigger('change_scene', 'edit', e.target.dataset.taskId);
    };

    const getTaskList = () => {
      const obj = {};
      obj.tasks = [];

      chrome.storage.local.get(obj, (data) => {
        this.tasks = data.tasks;
        this.update();
      });
    };

    this.deleteTask = (e) => {
      e.preventDefault();

      const taskId = e.target.dataset.taskId;

      let tasks = this.tasks.filter((v, i) => {
        return (v.id !== parseInt(taskId, 10));
      });

      chrome.storage.local.set({ tasks: tasks }, (items) => {
        this.faObs.trigger('show_toast', 'normal', 'Deleted!!');
        this.tasks = tasks;
        this.update();
      });
    };

    this.runTask = (e) => {
      const taskId = e.target.dataset.taskId;
      const obj = {};
      obj[taskId] = [];

      chrome.storage.local.get(obj, (data) => {

        let queryInfo = {
          active: true,
          windowId: chrome.windows.WINDOW_ID_CURRENT
        };

        chrome.tabs.query(queryInfo, (result) => {

          let currentTab = result.shift();

          chrome.tabs.sendMessage(currentTab.id, {
              'data': data[taskId]
            },
            (msg) => {
              this.faObs.trigger('show_toast', 'normal', 'Run!!');
            }
          );
        });
      });
    };
});