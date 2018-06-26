/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      people: [],
      newPersonName: "",
      newPersonBio: "",
      nameFilter: "",
      bioFilter: "",
      errors: []
    };
  },
  created: function() {
    axios
    .get('/api/people')
    .then(function(response) {
      this.people = response.data;
    }.bind(this));
  },
  methods: {
    addPerson: function() {

      // if ( this.newPersonName && this.newPersonBio ) {
        var clientParams = {
                          name: this.newPersonName,
                          bio: this.newPersonBio
                          };

        axios
        .post('/api/people', clientParams)
        .then(function(response) {
          this.people.push(response.data);
          this.newPersonName = "";
          this.newPersonBio = "";
          this.errors = [];
        }.bind(this))
        .catch(function(error) {
          this.errors = error.response.data.errors;
        }.bind(this));
      // }
    },
    deletePerson: function(inputPerson) {
      var index = this.people.indexOf(inputPerson);
      this.people.splice(index, 1);
    },
    toggleBio: function(inputPerson) {
      inputPerson.bioVisible = !inputPerson.bioVisible;
      // this.$set(inputPerson, "bioVisible", !(inputPerson.bioVisible))
    },
    isValidPerson: function(inputPerson) {
      var validName = inputPerson.name.toLowerCase().includes(this.nameFilter.toLowerCase());
      var validBio = inputPerson.bio.toLowerCase().includes(this.bioFilter.toLowerCase());
      return validName && validBio;
    }
  },
  computed: {}
};

var router = new VueRouter({
  routes: [{ path: "/", component: HomePage }],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  data: function() {
    return {

    }
  },
  router: router
});













