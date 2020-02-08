;
(function () {
    class Cartlist {
        constructor() {
            this.itemlist = $('.item-list');
        }
        init() {
            //1.获取本地存储
            if (localStorage.getItem('cartsid') && localStorage.getItem('cartnum')) {
                console.log(localStorage.getItem('cartsid').split(','));
                console.log(localStorage.getItem('cartnum').split(','));
                let csid = localStorage.getItem('cartsid').split(','); //sid
                let cnum = localStorage.getItem('cartnum').split(','); //数量
                for (let i = 0; i < csid.length; i++) {
                    this.render(csid[i], cnum[i]);
                }
            }
        }

        //2.渲染一条数据的方法
        render(sid, num) { //sid:当前渲染的购物车列表的编号，num:数量。
            let strhtml = '';
            $ajax({
                url: 'http://10.31.152.56/JS1912/Day%2027/taobaocart/php/taobaodata.php',
                dataType: 'json'
            }).then((data) => {
                for (let value of data) {
                    if (sid == value.sid) { //获取对应的那条数据
                        strhtml += `
                            <div class="goods-item goods-item-sele">
                                <div class="goods-info">
                                    <div class="cell b-checkbox">
                                        <div class="cart-checkbox">
                                            <input type="checkbox" checked="" name="" id="" value="" />
                                            <span class="line-circle"></span>
                                        </div>
                                    </div>
                                    <div class="cell b-goods">
                                        <div class="goods-name">
                                            <div class="goods-pic">
                                                <a href=""><img src="${value.url}" alt="" /></a>
                                            </div>
                                            <div class="goods-msg">
                                                <div class="goods-d-info">
                                                    <a href="">${value.title}</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="cell b-price">
                                        <strong>${value.price}</strong>
                                    </div>
                                    <div class="cell b-quantity">
                                        <div class="quantity-form">
                                            <a class="quantity-down" href="javascript:void(0)">-</a>
                                            <input type="text" value="${num}" />
                                            <a class="quantity-add" href="javascript:void(0)">+</a>
                                        </div>
                                    </div>
                                    <div class="cell b-sum">
                                        <strong>${(value.price*num).toFixed(2)}</strong>
                                    </div>
                                    <div class="cell b-action">
                                        <a href="javascript:void(0)">删除</a>
                                    </div>
                                </div>
                        </div>
                    `;
                        this.itemlist.innerHTML += strhtml;
                    }
                }
            });
        }
    }

    new Cartlist().init();

})();