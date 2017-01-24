/**
 * Created by Maxime on 24/01/17.
 */
angular.module('contactsParserService', []).service('contactsParser',contactsParserFnc);

contactsParserFnc.$inject=['$http','$q', '$log'];

function contactsParserFnc($http, $q, $log) {

    var fncContainer={
        parseContact:parseContact
    };

    function parseContact(contact) {

        var JSONToAddToItem = {};
        if (contact.displayName != null) {
            JSONToAddToItem["name"] = contact.displayName;
            if (contact.emails != null) {
                if (contact.emails.length > 0) {
                    var email = "";
                    for (var j = 0; j < contact.emails.length; j += 1) {
                        email += contact.emails[j].email;
                        if (j < contact.emails.length - 1) {
                            email += " / ";
                        }
                    }
                    JSONToAddToItem['emails'] = email;
                }
            }
            if (contact.phoneNumbers != null) {
                if (contact.phoneNumbers.length > 0) {
                    var phones = "";
                    for (var j = 0; j < contact.phoneNumbers.length; j += 1) {
                        phones += contact.phoneNumbers[j].number;
                        if (j < contact.phoneNumbers.length - 1) {
                            phones += " / ";
                        }
                    }
                    JSONToAddToItem['phoneNumbers'] = phones;
                }
            }
        }
        return JSONToAddToItem;
    }

    return fncContainer;
    }
