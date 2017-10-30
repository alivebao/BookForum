'use strict';

angular.module('app')
	.factory('Reader', function ReaderFactory($resource) {
		return $resource('/api/readers/:id', {id: '@id'})
	})
	.constant('Errors', {
		email: '不是有效格式的邮件地址',
		required: '此项不能为空'
	})
	.filter('error', function(Errors) {
		return function(name) {
			return Errors[name] || name;
		}
	})
	.directive('bfFieldError', function bfFieldError($compile) {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, element, attrs, ngModel) {
				var subScope = scope.$new(true);
				subScope.hasError = function() {
					return ngModel.$invalid && ngModel.$dirty;
				};
				subScope.errors = function() {
					return ngModel.$error;
				};

				var hint = $compile('<ul ng-if="hasError()"><li ng-repeat="(name, wrong) in errors()" ng-if="wrong">{{name | error}}</li></ul>')(subScope);
				element.after(hint);
			}
		}
	})
	.controller(
		'ReaderCreateCtrl', 
		function ReaderCreateCtrl($scope, Reader) {
			var vm = this;
			vm.submit = function(form) {
				console.log($scope.form)
				console.log(form);
				Reader.save(form, 
					function(reader){
						console.log(reader);
					}, 
					function(resp) {
						console.log(resp);
					}
				);
			};
		}
	)