fa-task-add
  h1 Add
  div
    input(ref="task_name" type="text" placeholder="address" value="")
    span(if="{ isError }") { errorMessage }

  .fa-buttons
    .fa-button
      a.button.button-outline.button-small(href="#" onclick="{ cancel }") Cancel
    .fa-button
      a.button.button-small(href="#" onclick="{ addTask }") Add

  style.
    :scope {
      display: block;
    }

    span {
      padding-left: 5px;
      font-size: 1.4rem;
      color: #f44336;
    }

    .fa-buttons {
      display: flex;
      margin-top: 20px;
    }

    .fa-button:first-child {
      margin-left: auto;
      margin-right: 20px;
    }

  script.
    this.on('before-mount', () => {
      this.mixin('faObs');
      this.isError = false;
      this.errorMessage = '';
      getTaskList();
    });

    /**
     * キャンセル
     */
    this.cancel = () => {
      this.faObs.trigger('change_scene', 'list');
    };

    /**
     * タスクの追加
     * @param  {object} e イベントオブジェクト
     */
    this.addTask = (e) => {
      e.preventDefault();

      const name = this.refs['task_name'].value;

      // エラーチェック
      if (!(/\S/.test(name))) {
        this.isError = true;
        this.errorMessage = 'Please enter';
        this.update();
        return;
      }

      // idの最大値を取得
      let maxId = 0;
      for (let i = 0, length = this.tasks.length; i < length; i++) {
        if (maxId < this.tasks[i].id) {
          maxId = this.tasks[i].id;
        }
      }

      // タスクを追加
      this.tasks.push({
        id: maxId + 1,
        name: name,
        count: 0
      });

      // Chromeのストレージに登録
      chrome.storage.local.set({ tasks: this.tasks }, (items) => {
        this.faObs.trigger('show_toast', 'normal', 'Added!!');
        this.faObs.trigger('change_scene', 'list');
      });
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
