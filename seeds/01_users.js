exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(function() {
            // Inserts seed entries
            return knex('users').insert([
                { id: 1, name: 'alice', user_type: 'lender', email: 'alice@gmail.com', max_exposure: 100.0, min_rate_of_interest: 10.0 },
                { id: 2, name: 'bob', user_type: 'lender', email: 'bob@gmail.com', max_exposure: 100.0, min_rate_of_interest: 10.0 },
                { id: 3, name: 'charlie', user_type: 'lender', email: 'charlie@gmail.com', max_exposure: 10.0, min_rate_of_interest: 10.0 },
                { id: 3, name: 'darel', user_type: 'borrower', email: 'darel@gmail.com' }
            ]);
        });
};