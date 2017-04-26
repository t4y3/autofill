<fa-toast show="{ isShow }">
  <p class="toast-text { type }">{ text }</p>

  <style>
    :scope {
      display: block;
      position: fixed;
      top: 0;
      right: 0;
      margin: 20px;
    }

    .toast-text {
      margin: 0;
      padding: 5px 10px;
      border-radius: 5px;
      color: #fff;
    }

    .toast-text.normal {
      background-color: #009688;
    }

    .toast-text.error {
      background-color: #f44336;
    }
  </style>

  <script>

    this.on('before-mount', () => {
      this.mixin('faObs');
      this.isShow = false;
      this.type = 'normal';
      this.text = '';

      this.faObs.on('show_toast', (type, text) => {
        this.isShow = true;
        this.type = type;
        this.text = text;
        this.update();

        setTimeout(() => {
          this.isShow = false;
          this.update();
        }, 3000)
      });
    });

  </script>

</fa-toast>
