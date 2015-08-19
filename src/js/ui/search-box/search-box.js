"use strict";


/**
 * @module
 * @name gt.searchBox
 */

angular.module("gt.searchBox", [])

  /**
   * @name searchBox
   * @description
   * Directive for the search box
   */

  .directive("searchBox", function () {
    return {
      templateUrl: "/views/ui/search-box/search-box.tpl.html",
      scope: {},
      link (scope, elem, attrs) {

        let formSubmit = scope.$parent[attrs.searchBoxSubmit],
            directive = angular.element(elem),
            input = directive.find("input");

        scope.hide = true;

        scope.onSubmit = function () {
          scope.hide = false;
          formSubmit(scope.searchTerm);
          directive.removeClass("active");
        };

        scope.dropDown = function dropDown () {
          scope.hide = true;
          directive.addClass("active");
          input[0].focus();
        }

      }
    };
  });