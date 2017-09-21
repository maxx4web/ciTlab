/**
 * Created by maxx on 11/07/2017.
 */

w3.includeHTML();

new Vue({
    el: '#admin-lois',


    // Here we can register any values or collections that hold data
    // for the application
    data: {
        loi: {id: '', titre: '', detail: '', date: ''},
        lois: [],
        isEditingTitle: [],
        isEditingDetail: []
    },

    directives: {
        focus: {
            // directive definition
            update: function (el, binding) {
                console.log('focus update');
                // Focus the element
                binding.value ? el.focus() : el.blur();
            }
        }
    },

    mounted: function () {
        console.log('mounted');

        this.handle();
    },

    // Methods we want to use in our application are registered here
    methods: {
        fetchLois: function () {
            console.log('fetchLois');
            this.$http.get('/lois')
                .then(function (response) {
                        this.lois = response.body;
                        console.log(response.body);
                        this.isEditingTitle = Array(this.lois.length).fill(false);
                        this.isEditingDetail = Array(this.lois.length).fill(false);
                    }
                    , function (err) {
                        console.log(err);
                    });

        },

        //TODO bouton suppression
        //TODO inline input date
        //TODO appel côté serveur pour stocker en session
        //TODO renommer "loi" en "nouvelle loi"
        //TODO validation pur empecher une loi vide


        addLoi: function () {
            console.log("addLoi");
            this.lois.push(this.loi);
            this.loi = {id: '', titre: '', detail: '', date: ''};
        },

        resetForm: function () {
            console.log("resetForm");
            this.loi = {id: '', titre: '', detail: '', date: ''};
        },

        editTitle: function (index) {
            console.log("editTitle");
            this.isEditingTitle.splice(index, 1, true);

        },

        saveTitle: function (index) {
            console.log("saveTitle");
            this.isEditingTitle.splice(index, 1, false);
            var loi = this.lois[index];
            this.$http.put('/lois/' + loi.id, loi)
                .then(function (response) {
                        console.log(response);
                    }
                    , function (err) {
                        console.log(err);
                    });
        },

        editDetail: function (index) {
            console.log("editDetail");
            this.isEditingDetail.splice(index, 1, true);
        },

        saveDetail: function (index) {
            console.log("saveDetail");
            this.isEditingDetail.splice(index, 1, false)
            //TODO this.$http.post('/...')
        }
    }

});
