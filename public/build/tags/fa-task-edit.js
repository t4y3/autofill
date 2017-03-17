riot.tag2('fa-task-edit', '<h1>Edit</h1> <div class="fa-buttons"> <a class="button button-small" href="#" onclick="{back}">Back</a> <div class="fa-buttons-right"> <a class="fa-button button button-small" href="#" onclick="{saveItems}">Save</a> <a class="fa-button button button-small" href="#" onclick="{runTask}">Run</a> </div> </div> <form> <table> <thead> <tr> <th>Type</th> <th>Name</th> <th>Value</th> <th></th> </tr> </thead> <tbody> <tr each="{items}"> <td> <select> <option value="text" selected="{type === \'text\'}">text</option> <option value="textarea" selected="{type === \'textarea\'}">textarea</option> <option value="checkbox" selected="{type === \'checkbox\'}">checkbox</option> <option value="radio" selected="{type === \'radio\'}">radio</option> </select> </td> <td><input type="text" placeholder="NAME" riot-value="{name}"></td> <td><input type="text" placeholder="John Smith" riot-value="{value}"></td> <td><a class="button button-small button-outline" href="#" onclick="{deleteItem}">Delete</a></td> </tr> <tr> <td></td> <td></td> <td></td> <td><a class="button button-small" href="#" onclick="{addItem}">Add</a></td> </tr> </tbody> </table> </form>', 'fa-task-edit,[data-is="fa-task-edit"]{ display: block; } fa-task-edit .fa-buttons,[data-is="fa-task-edit"] .fa-buttons{ display: flex; } fa-task-edit .fa-buttons-right,[data-is="fa-task-edit"] .fa-buttons-right{ margin-left: auto; } fa-task-edit .fa-button,[data-is="fa-task-edit"] .fa-button{ margin-left: 20px; }', '', function(opts) {
        var _this = this;

        this.on('before-mount', () => {
            this.isEdit = false;
            this.items = this.opts.data;
        });

        this.back = (e) => {
            if (this.opts.callback) {
                this.opts.callback();
            }
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