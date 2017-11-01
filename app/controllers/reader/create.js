'use strict';

angular.module('app')
	.factory('Reader', function ReaderFactory($resource) {
		return $resource('/api/readers/:id', {id: '@id'})
	})
	.constant('Errors', {
		email: '不是有效格式的邮件地址',
		required: '此项不能为空',
		same: '此项必须与上一项相同'
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
				subScope.customMessages = scope.$eval(attrs.bfFieldError);				

				var hint = $compile('<ul ng-if="hasError()"><li ng-repeat="(name, wrong) in errors()" ng-if="wrong">{{name | error:customMessages}}</li></ul>')(subScope);
				element.after(hint);
			}
		}
	})
	.directive('bfAssertSameAs', function bfAssertSameAs() {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, element, attrs, ngModel) {				
				var isSame = function(value) {
					var anotherValue = scope.$eval(attrs.bfAssertSameAs);
					return value === anotherValue;
				};

				ngModel.$parsers.push(function(value) {
					ngModel.$setValidity('same', isSame(value));
					return isSame(value) ? value : undefined;
				});

				var getReferenceValue = function() {
					return scope.$eval(attrs.bfAssertSameAs);
				};

				scope.$watch(getReferenceValue, function() {
					ngModel.$setValidity('same', isSame(ngModel.$modelValue));
				});
			}
		};
	})
	.directive('bfCaptcha', function bfCaptcha() {
		return {
			restrict: 'A',
			link: function(scope, element) {
				var changesrc = function() {
					element.attr('src', '/api/captcha.jpg?random=' + new Date().getTime());
				};
				changesrc();
				element.on('click', function() {
					changesrc();
				});
			}
		};
	})
	.controller(
		'ReaderCreateCtrl', 
		function ReaderCreateCtrl($scope, Reader) {
			var vm = this;
			vm.submit = function(form) {
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