//数据接口：http://localhost/JS1912/Day%2027/taobaocart/php/taobaodata.php
;
(function () {

    class render {
        constructor() {
            this.goodslist = $('.goodslist');
        }
        init() {
            $ajax({
                url: 'http://10.31.152.56/JS1912/Day%2027/taobaocart/php/taobaodata.php',
                dataType: 'json'
            }).then((data) => {
                let strhtml = '<ul>';
                for (let value of data) {
                    strhtml += `
                        <li>
                            <a href="details.html?sid=${value.sid}">
                                <img src="${value.url}">
                                <h4>${value.title}</h4>
                                <p>${value.price}</p>
                            </a>
                        </li>
                    `;
                }
                strhtml += '</ul>';
                this.goodslist.innerHTML = strhtml;
            });
        }
    }

    new render().init();

})();