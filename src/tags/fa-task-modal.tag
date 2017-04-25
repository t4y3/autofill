<fa-task-modal>
    <h1>Add</h1>
    <div class="row">
        <div class="column column-50"><input ref="task_name" type="text" placeholder="NAME" value=""></div>
        <div class="column column-25"><a class="button button-small" href="#" onclick="{ cancel }">Cancel</a></div>
        <div class="column column-25"><a class="button button-small" href="#" onclick="{ addTask }">Add</a></div>
    </div>

    <style>
        :scope {
            display: block;
        }

    </style>

    <script>
        this.on('before-mount', () => {
            this.mixin('faObs');
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

            // idの最大値を取得
            let maxId = 0;
            for (var i = 0, length = this.tasks.length; i < length; i++) {
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
    </script>

</fa-task-modal>
