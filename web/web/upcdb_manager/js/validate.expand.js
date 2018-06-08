/**
 * @author liujiaxing
 * 
 * 在这里定义自己的验证规则，使用时，在需要验证的控件的class中添加相应要素，如
 *  <input type="text" name="IPstart"  class="required ip" id="IPstart" placeholder="输入起始 IP">
 *  则在验证时会验证是否符合下面名为 ip 的验证方法
 *  
 *  http://blog.csdn.net/qishuo_java/article/details/50672828  常见自定义规则
 */ 
jQuery.validator.addMethod("ip", function(value, element) {    
      return this.optional(element) || /^(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.)(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.){2}([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))$/.test(value);    
    }, "请填写正确的IP地址。");