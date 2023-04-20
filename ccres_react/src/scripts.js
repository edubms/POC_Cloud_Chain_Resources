const button_cadastrar = document.querySelector("#register");

button_cadastrar.addEventListener("click", function(e){
    e.preventDefault();

    const resource_wallet = document.querySelector("#resource_wallet");
    const resource_ip_address = document.querySelector("#resource_ip_address");
    const resource_login = document.querySelector("#resource_login");
    const resource_password = document.querySelector("#resource_password");
    const resource_size = document.querySelector("#resource_size");
    const resource_price = document.querySelector("#resource_price");

    const wallet = resource_wallet.value ;
    const ip_address = resource_ip_address.value ;
    const login = resource_login.value ;
    const password = resource_password.value ;
    const size = resource_size.value ;
    const price = resource_price.value ;

    console.log(wallet, ip_address, login, password, size, price);
});