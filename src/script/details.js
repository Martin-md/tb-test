;
(function () {
    class Details {
        constructor() {
            //接收sid
            this.sid = location.search.substring(1).split('=')[1];
            this.spic = $('#spic');
            this.bpic = $('#bpic');
            this.sf = $('#sf');
            this.bf = $('#bf');
            this.list = $('#list');
            this.list_ul = $('#list ul');
            this.count = $('#count');
        }

        init() {
            //将接收的sid传给后端。
            $ajax({
                url: 'http://10.31.152.56/JS1912/Day%2027/taobaocart/php/getsid.php',
                data: {
                    sid: this.sid
                },
                dataType: 'json'
            }).then((objdata) => {
                $('#spic img').src = objdata.url;
                $('.loadtitle').innerHTML = objdata.title;
                $('.loadpcp').innerHTML = objdata.price;
                let piclist = objdata.urls.split(',');
                let strhtml = '';
                for (let value of piclist) {
                    strhtml += `<li><img src="${value}" /></li>`;
                }
                this.list_ul.innerHTML = strhtml;
            });
            //执行添加购物车操作
            this.addcart();
        }
        //添加购物车操作
        addcart() {
            let goodsnum = []; //商品的数量
            let goodsid = []; //商品的编号
            //cartnum  cartsid:本地存储的key值
            function getcookie() {
                if (localStorage.getItem('cartnum') && localStorage.getItem('cartsid')) {
                    goodsnum = localStorage.getItem('cartnum').split(',');
                    goodsid = localStorage.getItem('cartsid').split(',');
                }
            }

            $('.p-btn a').onclick = () => {
                getcookie();
                if (goodsid.indexOf(this.sid) === -1) { //第一次点击,将sid传入，取到数量直接传入
                    goodsid.push(this.sid);
                    localStorage.setItem('cartsid', goodsid); //存入sid
                    goodsnum.push(this.count.value);
                    localStorage.setItem('cartnum', goodsnum); //存入数量
                } else { //多次点击，取出当前sid对应的数量+当前的数量，再存入本地存储。
                    let index = goodsid.indexOf(this.sid); //当前sid在数组中对应的位置
                    let newnum = parseInt(goodsnum[index]) + parseInt(this.count.value);
                    goodsnum[index] = newnum; //新的数量
                    localStorage.setItem('cartnum', goodsnum); //存入数量
                }
            }
        }
    }
    new Details().init();
})();