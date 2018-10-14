#import <MapKit/MapKit.h>
#import <React/RCTViewManager.h>

@interface RNMapManger : RCTViewManager
@end

@implementation RNMapManger

    RCT_EXPORT_MODULE(RNMap)
    RCT_EXPORT_VIEW_PROPERTY(zoomEnabled, BOOL)
    - (UIView *)view
    {
        return [[MKMapView alloc] init];
    }
@end
