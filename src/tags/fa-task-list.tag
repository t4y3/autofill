fa-task-list
  h1 List
  table(if="{ tasks.length }")
    colgroup
      col(width="80%")
      col(width="10%")
      col(width="10%")
    tbody
      tr(each="{ tasks }")
        td
          a(href="#" data-task-id="{ id }" onclick="{ editTask }") { name }
        td
          a.fa-button.button.button-small(href="#" data-task-id="{ id }" onclick="{ runTask }") Run
        td
          a.fa-button.button.button-red.button-small(href="#" data-task-id="{ id }" onclick="{ deleteTask }") Delete
      tr
        td
        td
        td
          a.fa-button.button.button-small(href="#" onclick="{ addTask }") Add

  .empty-text
    p.empty-text__text タスクがありません

  style.
    :scope {
      display: block;
    }

    .fa-button {
      width: 100%;
    }

    .empty-text {
      padding: 20px;
      background-color: #fafbfc;
      border: 1px solid #e1e4e8;
      border-radius: 3px;
      box-shadow: inset 0 0 10px rgba(27,31,35,0.05);
    }

    .empty-text .empty-text__text{
      margin: 0;
      text-align: center;
    }

  script.
    this.on('before-mount', () => {
      this.mixin('faObs');
      this.tasks = [];

      // タスクを取得
      getTaskList();
    });

    /**
     * タスク追加処理
     * @param {object} e イベントオブジェクト
     */
    this.addTask = (e) => {
      this.faObs.trigger('change_scene', 'add');
    };

    /**
     * タスク編集処理
     * @param {object} e イベントオブジェクト
     */
    this.editTask = function(e) {
      this.faObs.trigger('change_scene', 'edit', e.target.dataset.taskId);
    };

    /**
     * タスク一覧の取得処理
     */
    const getTaskList = () => {
      const obj = {};
      obj.tasks = [];

      chrome.storage.local.get(obj, (data) => {
        this.tasks = data.tasks;
        this.update();
      });
    };

    /**
     * タスクの削除
     * @param  {object} e イベントオブジェクト
     */
    this.deleteTask = (e) => {
      e.preventDefault();

      const taskId = e.target.dataset.taskId;

      let tasks = this.tasks.filter((v, i) => {
        return (v.id !== parseInt(taskId, 10));
      });

      // Chromeのストレージに登録
      chrome.storage.local.set({ tasks: tasks }, (items) => {
        this.faObs.trigger('show_toast', 'normal', 'Deleted!!');
        this.tasks = tasks;
        this.update();
      });
    };

    /**
     * タスクの実行
     */
    this.runTask = (e) => {
      const taskId = e.target.dataset.taskId;
      const obj = {};
      obj[taskId] = [];

      chrome.storage.local.get(obj, (data) => {

        // 取得するタブの条件
        let queryInfo = {
          active: true,
          windowId: chrome.windows.WINDOW_ID_CURRENT
        };

        // タブの情報を取得する
        chrome.tabs.query(queryInfo, (result) => {
          // 配列の先頭に現在タブの情報が入っている
          let currentTab = result.shift();

          // 現在表示しているタブにメッセージを送る
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
