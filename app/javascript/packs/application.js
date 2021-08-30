// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"

Rails.start()
Turbolinks.start()
ActiveStorage.start()

require("bootstrap")
require("jquery")
require("jquery-ui")
require("moment")
require("select2")
require("@fortawesome/fontawesome-free/css/all")

require("../javascript/fullcalendar")

import * as bootstrap from 'bootstrap';
import moment from 'moment';

window.$ = jQuery;
window.bootstrap = bootstrap;
window.moment = moment;

document.addEventListener('turbolinks:load', function() {
    $.getScript('/')
    $('.form-select').select2()
    
});