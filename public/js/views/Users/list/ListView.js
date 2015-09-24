define([
        'views/listViewBase',
        'text!templates/Users/list/ListHeader.html',
        'views/Users/CreateView',
        'views/Users/list/ListItemView',
        'collections/Users/filterCollection',
        'dataService'
    ],

    function (listViewBase, listTemplate, createView, listItemView, contentCollection, dataService) {
        var UsersListView = listViewBase.extend({
            createView              : createView,
            listTemplate            : listTemplate,
            listItemView            : listItemView,
            contentCollection       : contentCollection,
            contentType             : 'Users',//needs in view.prototype.changeLocationHash
            totalCollectionLengthUrl: '/totalCollectionLength/Users',
            formUrl                 : '#easyErp/Users/form/',

            initialize: function (options) {
                this.startTime = options.startTime;
                this.collection = options.collection;
                _.bind(this.collection.showMore, this.collection);
                this.defaultItemsNumber = this.collection.namberToShow || 100;
                this.newCollection = options.newCollection;
                this.deleteCounter = 0;
                this.page = options.collection.page;
                this.sort = options.sort;
                this.render();
                this.getTotalLength(null, this.defaultItemsNumber);
                this.contentCollection = contentCollection;
            },

            render: function () {
                var self;
                var currentEl;

                $('.ui-dialog ').remove();

                self = this;
                currentEl = this.$el;

                currentEl.html('');
                currentEl.append(_.template(listTemplate));
                currentEl.append(new listItemView({
                    collection : this.collection,
                    page       : this.page,
                    itemsNumber: this.collection.namberToShow
                }).render());

                this.renderCheckboxes();

                this.renderPagination(currentEl, this);

                currentEl.append("<div id='timeRecivingDataFromServer'>Created in " + (new Date() - this.startTime) + " ms</div>");

            },

        });

        return UsersListView;
    });
