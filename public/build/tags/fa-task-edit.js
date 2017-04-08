riot.tag2('fa-task-edit', '<h1>Edit</h1> <div class="fa-buttons"> <a class="button button-small" href="#" onclick="{back}">Back</a> <div class="fa-buttons-right"> <a class="fa-button button button-small" href="#" onclick="{saveItems}">Save</a> <a class="fa-button button button-small" href="#" onclick="{runTask}">Run</a> </div> </div> <form> <table> <thead> <tr> <th>Type</th> <th>Name</th> <th>Value</th> <th></th> </tr> </thead> <tbody> <tr each="{items}" ref="task_item"> <td> <select class="fa-input-type"> <option value="text" selected="{type === \'text\'}">text</option> <option value="textarea" selected="{type === \'textarea\'}">textarea</option> <option value="checkbox" selected="{type === \'checkbox\'}">checkbox</option> <option value="radio" selected="{type === \'radio\'}">radio</option> </select> </td> <td><input class="fa-input-name" type="text" placeholder="NAME" riot-value="{name}"></td> <td><input class="fa-input-value" type="text" placeholder="John Smith" riot-value="{value}"></td> <td><a class="button button-small button-outline" href="#" onclick="{deleteItem}">Delete</a></td> </tr> <tr> <td></td> <td></td> <td></td> <td><a class="button button-small" href="#" onclick="{addItem}">Add</a></td> </tr> </tbody> </table> </form>', 'fa-task-edit,[data-is="fa-task-edit"]{ display: block; } fa-task-edit .fa-buttons,[data-is="fa-task-edit"] .fa-buttons{ display: flex; } fa-task-edit .fa-buttons-right,[data-is="fa-task-edit"] .fa-buttons-right{ margin-left: auto; } fa-task-edit .fa-button,[data-is="fa-task-edit"] .fa-button{ margin-left: 20px; }', '', function(opts) {
        this.on('before-mount', () => {
            this.isEdit = false;
            this.items = this.opts.data;
        });

        this.back = (e) => {
            if (this.opts.callback) {
                this.opts.callback();
            }
        };

        this.runTask = () => {
            let data = [];
            let $items = this.refs['task_item'];

            var taskId = this.opts.taskId;
            var obj = {};
            obj[taskId] = [];

            chrome.storage.local.get(obj, (data) => {

                var queryInfo = {
                    active: true,
                    windowId: chrome.windows.WINDOW_ID_CURRENT
                };

                chrome.tabs.query(queryInfo, function (result) {

                    var currentTab = result.shift();

                    chrome.tabs.sendMessage(currentTab.id, {
                            'data': data[taskId]
                        },
                        function(msg) {
                            console.log(msg);
                        }
                    );
                });
            });
        };

        this.saveItems = () => {
            var obj = {};
            var $items = this.refs['task_item'];
            var itemData = [];

            if (!$items) {
                return;
            }

            if ($items.tagName) {
                itemData.push(
                    {
                        type: $items.querySelector(".fa-input-type").value,
                        name: $items.querySelector(".fa-input-name").value,
                        value: $items.querySelector(".fa-input-value").value
                    }
                )
            }

            for (var i = 0, length = $items.length; i < length; i++) {
                itemData.push(
                    {
                        type: $items[i].querySelector(".fa-input-type").value,
                        name: $items[i].querySelector(".fa-input-name").value,
                        value: $items[i].querySelector(".fa-input-value").value
                    }
                )
            }

            obj[this.opts.taskId] = itemData;
            chrome.storage.local.set(obj, () => {
                debugger;
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