/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      people: [],
      newPersonName: "",
      newPersonBio: ""
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

      if ( this.newPersonName && this.newPersonBio ) {
        var tempPerson = {
                          name: this.newPersonName,
                          bio: this.newPersonBio,
                          bioVisible: false
                          };
        this.people.push(tempPerson);
        this.newPersonName = "";
        this.newPersonBio = "";
      }
    },
    deletePerson: function(inputPerson) {
      var index = this.people.indexOf(inputPerson);
      this.people.splice(index, 1);
    },
    toggleBio: function(inputPerson) {
      inputPerson.bioVisible = !inputPerson.bioVisible;
      // this.$set(inputPerson, "bioVisible", !(inputPerson.bioVisible))
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
  router: router
});
