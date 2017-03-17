<fa-root>
    <fa-tasks data="{ tasks }" if="{ tasks.length }"></fa-tasks>

    <style>
        :scope {
            display: block;
        }
    </style>

    <script>
        var request = require('superagent');
        var _this = this;

        this.on('before-mount', () => {
            this.tasks = [];

            getTaskList();
        });

        var getTaskList = function() {
            request
                .get('http://localhost:3005/tasks')
                .set('Accept', 'application/json')
                .end(function(err, res) {
                    if (res.ok) {
                        _this.tasks = res.body;
                        _this.update();
                    } else {
                        // error
                    }
                }
            );
        };
    </script>

</fa-root>