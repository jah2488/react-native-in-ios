//
//  ViewController.swift
//  ios-react-native
//
//  Created by Justin Herrick on 10/11/18.
//  Copyright © 2018 Justin Herrick. All rights reserved.
//

import UIKit
import React

class ViewController: UIViewController {
    var reactView : RCTRootView!
    override func viewDidLoad() {
        super.viewDidLoad()
        reactView = RCTRootView(
            bundleURL: URL(string: "http://localhost:8081/App.bundle?platform=ios"),
            moduleName: "RNView",
            initialProperties: [AnyHashable("title"): "I'm The Title in React!"],
            launchOptions: nil)
        reactView.frame = self.view.bounds
        reactView.autoresizingMask = [.flexibleWidth,.flexibleHeight]
        self.view.addSubview(reactView)
    }
}

