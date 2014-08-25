var api = require('../../');
var assert = require('chai').assert;

describe('Model iterators', function () {
	it('items', function () {
		var model = api.create(['A', 'B', 'C']);
		
		var args = [];
		var result = model.items(function (model, index) {
			args.push([model.pointer(), model.get(), index]);
		});
		
		assert.equal(result, model);
		assert.deepEqual(args, [['/0', 'A', 0], ['/1', 'B', 1], ['/2', 'C', 2]]);
	});
	
	it('map', function () {
		var model = api.create(['A', 'B', 'C']);
		
		var args = [];
		var result = model.map(function (model, index) {
			return '!' + model.get();
		});
		
		assert.deepEqual(result, ['!A', '!B', '!C']);
	});
	
	it('props', function () {
		var model = api.create({foo: 'FOO', bar: 'BAR', baz: 'BAZ'});
		
		var args = {};
		var result = model.props(function (model, key) {
			assert.isFalse(key in args);
			args[key] = model.pointer();
		});
		
		assert.equal(result, model);
		assert.deepEqual(args, {foo: '/foo', bar: '/bar', baz: '/baz'});
	});

	it('mapProps', function () {
		var model = api.create({foo: 'FOO', bar: 'BAR', baz: 'BAZ'});
		
		var result = model.mapProps(function (model, key) {
			return model.pointer();
		});
		assert.deepEqual(result, {foo: '/foo', bar: '/bar', baz: '/baz'});

		var result2 = model.mapProps(['foo', 'baz', 'bar'], function (model, key) {
			return model.pointer();
		});
		
		assert.deepEqual(result2, ['/foo', '/baz', '/bar']);
	});
});