'use strict';

angular.module('app')
	.controller(
		'ThreadListCtrl', 
		function ThreadListCtrl($scope) {
			var vm = this;
			vm.items = [
				{
					title: '这是第一个主题帖',
					poster:　'Jack',
					dateCreated: '2012-04-12T15:00:00'
				},
				{
					title: '这是第一个主题帖',
					poster:　'Alice',
					dateCreated: '2014-04-12T15:00:00'
				}
			];
		for(var i = 0 ; i < 10 ; i++){
			vm.items.push({
				title: '主题' + i,
				poster: 'user ' + i,
				dateCreated: '2014-03-23T15:00:00'
			});
		}
		}
	)