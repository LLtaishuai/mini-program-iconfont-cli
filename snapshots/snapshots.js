Component({
  properties: {
    // alipay | user | setup
    name: {
      type: String,
    },
    size: {
      type: Number,
      value: 20,
    },
    // string || string[]
    color: {
      type: null,
      observer: function (color, originalColor) {
        if (color !== originalColor) {
          this.setData({
            colors: this.fixColor()
          });
        }
      }
    }
  },
  data: {
    colors: ''
  },
  methods: {
    fixColor: function() {
      var color = this.data.color;
      var self = this;

      if (typeof color === 'string') {
        return color.indexOf('#') === 0 ? this.hex2rgb(color) : color;
      }

      return color.map(function (item) {
        return item.indexOf('#') === 0 ? self.hex2rgb(item) : item;
      });
    },
    hex2rgb: function(hex) {
      var rgb = [];

      //去除前缀 # 号
      hex = hex.substr(1);

      if (hex.length === 3) {
        // 处理 '#abc' 成 '#aabbcc'
        hex = hex.replace(/(.)/g, '$1$1');
      }

      hex.replace(/../g, function(color) {
        // 按16进制将字符串转换为数字
        rgb.push(parseInt(color, 0x10));

        return color;
      });

      return 'rgb(' + rgb.join(',') + ')';
    }
  }
})