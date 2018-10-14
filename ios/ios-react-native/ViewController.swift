import UIKit
import React

class ViewController: UIViewController {

    var reactView : RCTRootView!

    override func viewDidLoad() {
        super.viewDidLoad()

        let lb = UILabel(frame: CGRect(x: 50, y: 0, width: 300, height: 100))
        lb.text = "I am an iOS App"
        lb.textColor = UIColor.blue
        self.view.addSubview(lb);

        //Path to the file from the running server
        let server_url = "http://localhost:8081/"
        let file_path = "react_native/App"
        let params = ".bundle?platform=ios"

        // Name of RN module that was registered with `AppRegistry`
        let react_native_module_name = "RNView"

        // Props to pass to RN module
        let props = [AnyHashable("title"): "I'm The Title in React!"]

        reactView = RCTRootView(
            bundleURL: URL(string: (server_url + file_path + params)),
            moduleName: react_native_module_name,
            initialProperties: props,
            launchOptions: nil)

        // Make view slightly smaller so its more apparent the react native app is _inside_ the iOS app.
        reactView.frame = CGRect(x: 20, y: 60, width: self.view.bounds.width - 40, height: self.view.bounds.height - 120)
        reactView.layer.borderWidth = 2
        reactView.layer.borderColor = UIColor(red:222/255, green:225/255, blue:227/255, alpha: 1).cgColor
        reactView.autoresizingMask = [.flexibleWidth,.flexibleHeight]

        self.view.addSubview(reactView)
    }
}

