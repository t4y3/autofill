<fa-task-edit>
    <!-- tag -->
    <h1>Edit</h1>
    <div class="fa-buttons">
        <a class="button button-small" href="#" onclick="{ back }">Back</a>
        <div class="fa-buttons-right">
            <a class="fa-button button button-small" href="#" onclick="{ saveItems }">Save</a>
            <a class="fa-button button button-small" href="#" onclick="{ runTask }">Run</a>
        </div>
    </div>

    <form>
        <table>
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Name</th>
                    <th>Value</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr each="{ items }" ref="task_item">
                    <td>
                        <select class="fa-input-type">
                            <option value="text" selected={ type === 'text' }>text</option>
                            <option value="textarea" selected={ type === 'textarea' }>textarea</option>
                            <option value="checkbox" selected={ type === 'checkbox' }>checkbox</option>
                            <option value="radio" selected={ type === 'radio' }>radio</option>
                        </select>
                    </td>
                    <td><input class="fa-input-name" type="text" placeholder="NAME" value="{ name }"></td>
                    <td><input class="fa-input-value" type="text" placeholder="John Smith" value="{ value }"></td>
                    <td><a class="button button-small button-outline" href="#" onclick="{ deleteItem }">Delete</a></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><a class="button button-small" href="#" onclick="{ addItem }">Add</a></td>
                </tr>
            </tbody>
        </table>
    </form>

    <style>
        :scope {
            display: block;
        }

        .fa-buttons {
            display: flex;
        }

        .fa-buttons-right {
            margin-left: auto;
        }

        .fa-button {
            margin-left: 20px;
        }
    </style>

    <script>
        var _this = this;

        this.on('before-mount', () => {
            this.isEdit = false;
            this.items = this.opts.data;
            debugger;
        });

        this.back = (e) => {
            if (this.opts.callback) {
                this.opts.callback();
            }
        };

        this.runTask = () => {
            let data = [];
            let $items = this.refs['task_item'];

            if ($items.tagName) {
                data.push(
                    {
                        type: $items.querySelector(".fa-input-type").value,
                        name: $items.querySelector(".fa-input-name").value,
                        value: $items.querySelector(".fa-input-value").value
                    }
                )
            } else {
                for (var i = 0, length = $items.length; i < length; i++) {
                    data.push(
                        {
                            type: $items[i].querySelector(".fa-input-type").value,
                            name: $items[i].querySelector(".fa-input-name").value,
                            value: $items[i].querySelector(".fa-input-value").value
                        }
                    )
                }
            }
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                        'dafa': data
                    },
                    function(msg) {
                        console.log(msg);
                    }
                );
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

    </script>

</fa-task-edit>