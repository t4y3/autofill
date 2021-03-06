fa-task-edit
  h1 Edit
  a.button.button-small(href="#" onclick="{ back }") Back
  form
    table
      colgroup
        col(width="30%")
        col(width="60%")
        col(width="10%")
      thead
        tr
          th Name
          th Value
          th
      tbody
        tr(each="{ items }" ref="task_item")
          td
            input.fa-input-name(type="text" placeholder="NAME" value="{ name }")
          td
            input.fa-input-value(type="text" placeholder="John Smith" value="{ value }")
          td
            a.fa-button.button.button-small.button-red(href="#" onclick="{ deleteItem }") Delete

        tr
          td
          td
          td
            a.fa-button.button.button-small(href="#" onclick="{ addItem }") Add

  style.
    :scope {
      display: block;
    }

    .fa-button {
      width: 100%;
    }

  script.
    this.on('before-mount', () => {
      this.mixin('faObs');
      this.items = [];

      getItemList(this.opts.taskId);
    });

    /**
     * 一覧画面への戻る処理
     * @param  {object} e イベントオブジェクト
     */
    this.back = (e) => {
      this.saveItems(() => {
        this.faObs.trigger('change_scene', 'list');
      });
    };

    /**
     * アイテムの保存処理
     */
    this.saveItems = (fn) => {
      const obj = {};
      const $items = this.refs['task_item'];
      const itemData = [];

      if (!$items) {
        return;
      }

      if ($items.tagName) {
        itemData.push(
          {
            name: $items.querySelector(".fa-input-name").value,
            value: $items.querySelector(".fa-input-value").value
          }
        )
      }

      for (let i = 0, length = $items.length; i < length; i++) {
        itemData.push(
          {
            name: $items[i].querySelector(".fa-input-name").value,
            value: $items[i].querySelector(".fa-input-value").value
          }
        )
      }

      // Chromeのストレージに登録
      obj[this.opts.taskId] = itemData;
      chrome.storage.local.set(obj, () => {
        this.faObs.trigger('show_toast', 'normal', 'Saved!!');
        fn();
      });
    };

    /**
    * アイテム一覧の取得処理
    * @param  {string} id タスクID
    */
    const getItemList = (id) => {
      const obj = {};
      obj[id] = [];
      this.editTaskId = id;

      chrome.storage.local.get(obj, (data) => {
        this.items = data[id];
        this.update();
      });
    };

    /**
     * アイテムの削除処理
     * @param  {object} e イベントオブジェクト
     */
    this.deleteItem = (e) => {
      this.items.splice(e.item.i, 1);
      this.update();
    };

    /**
     * アイテムの追加処理
     * @param  {object} e イベントオブジェクト
     */
    this.addItem = (e) => {
      e.preventDefault();
      this.items.push({});
      this.update();
    };
