var func = async () => {
    // const api_key = "e10e919a74928d02511228a1bcc24bf2";

    var data = await fetch('http://api.weatherstack.com/current?access_key=7270096f8565a4ea6750f6db1a4b90ef&query=NewYork');
    var obj = await data.json();
    console.log(obj);

}
func() ;