## 数值格式化

```
const formatDataSize = function (size) {
  if (size < 10000) {
    return size;
  } else if (size < 10000000) {
    return (size / 10000).toFixed(2) + "万";
  } else if (size < 100000000000) {
    return (size / 100000000).toFixed(2) + "亿";
  } else {
    return (size / 100000000000).toFixed(2) + "兆";
  }
};
```
