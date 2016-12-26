(() => {

    function filterItemPredicate(upperQuery, item) {
        if (item.name.toUpperCase().includes(upperQuery)) {
            return true;
        }

        return item.tags.some((tag) => {
            return tag.toUpperCase().includes(upperQuery);
        });
    }

    const app = new Vue({
        el: '#app',
        data: {
            query: '',
            items: []
        },
        computed: {
            visibleItems: function () {
                const upperQuery = this.query.toUpperCase();

                return this.items.filter(filterItemPredicate.bind(null, upperQuery));
            }
        }
    });

    const dataHeaders = new Headers();
    dataHeaders.append('pragma', 'no-cache');
    dataHeaders.append('cache-control', 'no-cache');

    fetch('./data.json', {
        headers: dataHeaders
    }).then((response) => {
        return response.json().then((json) => {
            app.items = json.items;
        });
    });

})();
