var app = new Vue({
    el: '#app',

    // Here we can register any values or collections that hold data
    // for the application
    data: {
        message: 'Hello Vue!',
        data: ''
    },

    // Methods we want to use in our application are registered here
    methods: {
        submit: function () {
            console.log("form submitted");
            // post input
            var formData = new FormData();
            formData.set('text', this.data);
            this.$http.post('/review', this.data)
                .then(function (response) {
                    this.message = response.body;
                }, function () {
                    console.log("Error when posting data : " + formData);
                });


//                // get formatted text from server to display
//                fetch('/home')
//                    .then(function (response) {
//                        return response.text();
//                        })
//                .then(function (text) {
//                    this.message = text;
//                });
        }
    }
});
