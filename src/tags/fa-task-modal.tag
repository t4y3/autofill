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
        this.saveName = (e) => {
            // TODO: ここでストレージに登録する
            e.preventDefault();
            var name = this.refs['task_name'].value;
            if (this.opts.callback) {
                this.opts.callback(name);
            }
        };
    </script>

</fa-task-modal>