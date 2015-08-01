import { expect } from 'chai';
import dataLoader from '../../app/util/dataLoader';

describe('dataLoader', function () {
  let mockRoutes = {
    routes: [
      {
        handler: {
          load() {
            return 'first load method';
          },
          displayName: 'first route'
        }
      }
    ]
  };
  it('should call load method of individual component with no children', function () {
    dataLoader('irrelevant', mockRoutes, {}).then((data) => {
      expect(data).to.have.property('first route', 'first load method');
    });
  });
  it('should call load method of component and its first child', function () {
    mockRoutes.routes[0].handler.children = [
      {
        load() {
          return 'second load method';
        },
        displayName: 'second route'
      }
    ];
    dataLoader('irrelevant', mockRoutes, {}).then((data) => {
      expect(data).to.have.property('first route', 'first load method');
      expect(data).to.have.property('second route', 'second load method');
    });
  });
  it('should call load method of component and its childs child', function () {
    let childrenArray = [
      {
        load() {
          return 'second load method';
        },
        displayName: 'second route'
      }
    ];
    childrenArray[0].children = [
      {
        load() {
          return 'third load method';
        },
        displayName: 'third route'
      }
    ];
    mockRoutes.routes[0].handler.children = childrenArray;
    dataLoader('irrelevant', mockRoutes, {}).then((data) => {
      expect(data).to.have.property('first route', 'first load method');
      expect(data).to.have.property('second route', 'second load method');
      expect(data).to.have.property('third route', 'third load method');
    });
  });
});
