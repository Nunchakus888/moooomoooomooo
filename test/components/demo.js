import React from 'react';
import { findDOMNode } from 'react-dom';
import { expect } from 'chai';
import TestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme'
import sinon from 'sinon'
import { Field } from 'redux-form'

describe('FormTesting', () => {

  describe('the constructure is loading', () => {

    it('the form is loading', () => {
      const val = 1
      expect(val).to.equal(1)
    })

  })

})
