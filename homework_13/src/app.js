const app = angular.module('app', [])
    .controller('appCtrl', function ($scope) {
        $scope.defaultPosts = data;
        $scope.categoriesList = ['all'];
        $scope.showAddForm = false;
        $scope.showAddPost = true;
        $scope.addCategoryToList = function (category) {
            category = category.toLowerCase();
            if ($scope.categoriesList.indexOf(category) === -1) {
                $scope.categoriesList.push(category);
            };
        };

        $scope.searchByCategory = function (category) {
            $scope.selectedCategory = category !== 'all' ? category : '';
            $scope.symbolsInTitle = '';
        };

        $scope.searchSelectedCategory = function () {
            $scope.selectedCategory = '';
        };

        $scope.addNewPost = function (isValid) {
            if (isValid) {
                $scope.newPostCategories = $scope.newPostCategories.replace(/,/g, ' ').split(' ');
                $scope.newPostCategories.forEach((element) => $scope.addCategoryToList(element));
                $scope.newPostUrl = $scope.newPostUrl ? './assets/' + $scope.newPostUrl : './assets/Warsaw.jpg';
                $scope.defaultPosts.push({
                    title: $scope.newPostTitle,
                    categories: $scope.newPostCategories,
                    description: $scope.newPostDescription,
                    url: $scope.newPostUrl
                });
                $scope.showAddForm = false;
                $scope.showAddPost = true;
                $scope.newPostTitle = $scope.newPostCategories = $scope.newPostDescription = $scope.newPostUrl = '';
            };
        };

        $scope.showAddFormFunc = function () {
            $scope.showAddForm = true;
            $scope.showAddPost = false;
        };

        $scope.savePost = function (index, editedTitle, editedDescription) {
            $scope.defaultPosts[index].title = editedTitle ? editedTitle : $scope.getTitleValue(index);
            $scope.defaultPosts[index].description = editedDescription ? editedDescription : $scope.getDescription(index);
        };

        $scope.getTitleValue = function (index) {
            return $scope.defaultPosts[index].title;
        };
        $scope.getDescription = function (index) {
            return $scope.defaultPosts[index].description;
        };
    });