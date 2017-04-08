<fa-task-modal>
    <div class="fa-modal-inner">
        <div class="row">
            <div class="column column-75"><input ref="task_name" type="text" placeholder="NAME" value=""></div>
            <div class="column column-25"><a class="button button-small" href="#" onclick="{ saveName }">Add</a></div>
        </div>
    </div>

    <style>
        :scope {
            display: flex;
            justify-content: center;
            align-items: center;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #fff;
        }

        .fa-modal-inner {
            width: 80%;
            padding: 5%;
        }
    </style>

    <script>
        this.on('before-mount', () => {
            this.mixin('faObs');
        });

        /**
         * 追加したタスクの保存処理
         * @param  {object} e イベントオブジェクト
         */
        this.saveName = (e) => {
            e.preventDefault();

            var name = this.refs['task_name'].value;

            // 現在、登録されているタスク
            var tasks = this.opts.data;

            // idの最大値を取得
            var maxId = 0;
            for (var i = 0, length = tasks.length; i < length; i++) {
                if (maxId < tasks[i].id) {
                    maxId = tasks[i].id;
                }
            }

            // タスクを追加
            tasks.push({
                id: maxId + 1,
                name: name,
                count: 0
            });

            // Chromeのストレージに登録
            chrome.storage.local.set({ tasks: tasks }, (items) => {
                this.faObs.trigger('update_tasks', tasks);
            });
        };
    </script>

</fa-task-modal>