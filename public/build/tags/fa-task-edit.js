riot.tag2('fa-task-edit', '<h1>Edit</h1> <a class="button button-small" href="#" onclick="{back}">Back</a> <form> <table> <thead> <tr> <th>Name</th> <th>Value</th> <th></th> </tr> </thead> <tbody> <tr each="{items}" ref="task_item"> <td><input class="fa-input-name" type="text" placeholder="NAME" riot-value="{name}"></td> <td><input class="fa-input-value" type="text" placeholder="John Smith" riot-value="{value}"></td> <td><a class="button button-small button-red" href="#" onclick="{deleteItem}">Delete</a></td> </tr> <tr> <td></td> <td></td> <td><a class="button button-small" href="#" onclick="{addItem}">Add</a></td> </tr> </tbody> </table> </form>', 'fa-task-edit,[data-is="fa-task-edit"]{ display: block; }', '', function(opts) {
    this.on('before-mount', () => {
      this.mixin('faObs');
      this.items = [];

      getItemList(this.opts.taskId);
    });

    this.back = (e) => {
      this.saveItems(() => {
        this.faObs.trigger('change_scene', 'list');
      });
    };

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

      obj[this.opts.taskId] = itemData;
      chrome.storage.local.set(obj, () => {
        fn();
      });
    };

    const getItemList = (id) => {
      const obj = {};
      obj[id] = [];
      this.editTaskId = id;

      chrome.storage.local.get(obj, (data) => {
        this.items = data[id];
        this.update();
      });
    };

    this.deleteItem = (e) => {
      this.items.splice(e.item.i, 1);
      this.update();
    };

    this.addItem = (e) => {
      e.preventDefault();
      this.items.push({});
      this.update();
    };

});
