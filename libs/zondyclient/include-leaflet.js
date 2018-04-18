(function () {
  var r = new RegExp("(^|(.*?\\/))(include-leaflet\.js)(\\?|$)"),
      s = document.getElementsByTagName('script'), targetScript;
  for (var i = 0; i < s.length; i++) {
    var src = s[i].getAttribute('src');
    if (src) {
      var m = src.match(r);
      if (m) {
        targetScript = s[i];
        break;
      }
    }
  }

  function inputScript(url) {
    var script = '<script type="text/javascript" src="' + url + '"><' + '/script>';
    document.writeln(script);
  }

  function inputCSS(url) {
    var css = '<link rel="stylesheet" href="' + url + '">';
    document.writeln(css);
  }

  function inArray(arr, item) {
    for (i in arr) {
      if (arr[i] == item) {
        return true;
      }
    }
    return false;
  }

  //comman leaflet librarys
  function load() {
    var onInternetMode = true;
    var ip = targetScript.getAttribute('ip');
    var socket = targetScript.getAttribute('socket');

    var includes = (targetScript.getAttribute('include') || "").split(",");
    var excludes = (targetScript.getAttribute('exclude') || "").split(",");

    var httpUrl = "";

    if(ip && socket){
      onInternetMode = false;//区域网模式
    }else{//互联网模式
      onInternetMode = true;
    }

    if(onInternetMode){
      httpUrl = "http://182.61.52.190:8800";//"http://www.smaryun.com";
    }else{
      httpUrl = "http://" + ip + ":" + socket + "";
    }

    if (!inArray(excludes, 'leaflet')) {
      inputCSS(httpUrl + "/cdn/leaflet/leaflet.css");
      inputScript(httpUrl + "/cdn/leaflet/leaflet.js");
    }
    // if (!inArray(excludes, 'leaflet')) {
    //   inputScript(httpUrl + "/cdn/zondyclient/mapgis-leaflet.js");
    // }
    // if (!inArray(includes, 'wmts')) {
    //    inputScript(httpUrl + "/cdn/leaflet plugins/leaflet-tilelayer-wmts.js");
    // }
    // if (inArray(includes, 'turf')) {
    //    inputScript(httpUrl + "/cdn/turf/turf.min.js");
    // }
    if (inArray(includes, 'proj4')) {
      inputScript(httpUrl + "/cdn/proj4/proj4.js");
    }
    if (inArray(includes, 'mapv')) {
      inputScript(httpUrl + "/cdn/mapv/mapv.min.js");
    }
    // if (inArray(includes, 'echarts')) {
    //    inputScript(httpUrl + "/cdn/echarts/echarts.js");
    // }
    if (inArray(includes, 'echarts')) {
       inputScript(httpUrl + "/cdn/echarts/echarts.js");
    }
    if (inArray(includes, 'cluster')) {
      //https://unpkg.com/leaflet.markercluster@1.3.0/dist/
      inputCSS(httpUrl + "/cdn/leaflet-plugins/Leaflet.markercluster-1.3.0/dist/MarkerCluster.css");
      inputCSS(httpUrl + "/cdn/leaflet-plugins/Leaflet.markercluster-1.3.0/dist/MarkerCluster.Default.css");
      inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet.markercluster-1.3.0/dist/leaflet.markercluster.js");
    }
    if (inArray(includes, 'colors-marker')) {
      inputCSS(httpUrl + "/cdn/leaflet-plugins/Leaflet.awesome-markers/examples/css/font-awesome.min.css");
      inputCSS(httpUrl + "/cdn/leaflet-plugins/Leaflet.awesome-markers/dist/leaflet.awesome-markers.css");
      inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet.awesome-markers/dist/leaflet.awesome-markers.js");
    }
    if (inArray(includes, 'heater')) {
      inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet.heat/dist/leaflet-heat.js");
    }
    if (inArray(includes, 'animate-marker')) {
      inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet.AnimatedMarker/src/AnimatedMarker.js");
    }
    if (inArray(includes, 'realmove-marker')) {
      inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet.MovingMarker/MovingMarker.js");
    }
    if (inArray(includes, 'elasticsearch')) {
      inputScript(httpUrl + "/cdn/elasticsearch/14.1.0/elasticsearch.min.js");
    }
    if (inArray(includes, 'ant-path')) {
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-ant-path/dist/leaflet-ant-path.js");
    }
    if (inArray(includes, 'migrate')) {
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet.MigrationLayer/dist/leaflet.migrationLayer.js");
    }
    if (inArray(includes, 'elasticsearch')) {
      inputScript(httpUrl + "/cdn/elasticsearch/14.1.0/elasticsearch.min.js");
    }
    if (inArray(includes, 'els-mapgis')) {
      inputScript(httpUrl + "/cdn/zondyclient/els-mapgis.js");
    }
    if (inArray(includes, 'geohash')) {
      inputScript(httpUrl + "/cdn/geohash/geohash.js");
    }
    if (inArray(includes, 'geojson')) {
      inputScript(httpUrl + "/cdn/geojson/geojson.min.js");
    }
    if (inArray(includes, 'shapefile')) {
      inputScript(httpUrl + "/cdn/shapefile/shapefile.js");
    }
    if (inArray(includes, 'turf')) {
      //https://cdn.jsdelivr.net/npm/@turf/turf@5/turf.min.js
      inputScript(httpUrl + "/cdn/turf/turf.min.js");
    }
    if (inArray(includes, 'measurement')) {
      inputCSS(httpUrl + "/cdn/leaflet-plugins/leaflet-measurement/leaflet-ruler.css");
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-measurement/leaflet-ruler.js");
    }
    if (inArray(includes, 'Editable')) {
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Editable/Leaflet.Editable.js");
    }
    if (inArray(includes, 'Draw')) {
        inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/Leaflet.draw.js");
        inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/Leaflet.Draw.Event.js");
        inputCSS(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/leaflet.draw.css");
        inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/Toolbar.js");
        inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/Tooltip.js");
        inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/GeometryUtil.js");
        inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/LatLngUtil.js");
        inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/LineUtil.Intersect.js");
        inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/Polygon.Intersect.js");
        inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/Polyline.Intersect.js");
        inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/TouchEvents.js");
        inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/DrawToolbar.js");
        inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/Draw.Feature.js");
        inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/Draw.SimpleShape.js");
        inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/Draw.Polyline.js");
        inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/Draw.Marker.js");
        inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/Draw.Circle.js");
        inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/Draw.CircleMarker.js");
        inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/Draw.Polygon.js");
        inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/Draw.Rectangle.js");
        inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/EditToolbar.js");
        inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/EditToolbar.Edit.js");
        inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/EditToolbar.Delete.js");
        inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/Control.Draw.js");
        inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/Edit.Poly.js");
        inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/Edit.SimpleShape.js");
        inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/Edit.Rectangle.js");
        inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/Edit.Marker.js");
        inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/Edit.CircleMarker.js");
        inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/Edit.Circle.js");
      }
      if (inArray(includes, 'Toolbar')) {
          //inputCSS(httpUrl + "/cdn/leaflet-plugins/leaflet-Toolbar/bootstrap.min.css");
          inputCSS(httpUrl + "/cdn/leaflet-plugins/leaflet-Toolbar/bootstrap-theme.min.css");
          inputCSS(httpUrl + "/cdn/leaflet-plugins/leaflet-Toolbar/leaflet.draw.css");
          inputCSS(httpUrl + "/cdn/leaflet-plugins/leaflet-Toolbar/leaflet.toolbar.css");
          inputCSS(httpUrl + "/cdn/leaflet-plugins/leaflet-Toolbar/leaflet.draw-toolbar.css");
          inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Toolbar/leaflet.toolbar-src.js");
          inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Toolbar/leaflet.draw-src.js");
          inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Toolbar/leaflet.draw-toolbar.js");
          inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Toolbar/ColorPicker.js");
      }
      if (inArray(includes, 'Fullscreen')) {
          inputCSS(httpUrl + "/cdn/leaflet-plugins/leaflet-fullscreen/leaflet.fullscreen.css");
          inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-fullscreen/Leaflet.fullscreen.js");
      }
      if (inArray(includes, 'IconGlyph')) {
          inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-IconGlyph/Leaflet.Icon.Glyph.js");
      }
      if (inArray(includes, 'PathDrag')) {
          inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-PathDrag/Path.Drag.js");
      }
      if (inArray(includes, 'Graticule')) {
          inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Graticule/Leaflet.Graticule.js");
      }
    if (inArray(includes, 'datastore')) {
      inputScript(httpUrl + "/cdn/zondyclient/webclient-leaflet.js");
    }
    // if (inArray(includes, 'label')) {
    //   /*
    //      @ info - this function is conflit to cluster, so if you want to use this
    //        function,please don`t use cluster function
    //      @ property - {module} label linkto https://github.com/Leaflet/Leaflet.label
    //      @ author - Zondy PanZhuoran.ParnDeedlit
    //    */
    //    inputCSS(httpUrl + "/cdn/leaflet plugins/leaflet.label.css");
    //    inputScript(httpUrl + "/cdn/leaflet plugins/leaflet.label.js");
    //    inputScript(httpUrl + "/cdn/leaflet plugins/label.Label.js");
    //    inputScript(httpUrl + "/cdn/leaflet plugins/label.BaseMarkerMethods.js");
    //    inputScript(httpUrl + "/cdn/leaflet plugins/label.Marker.Label.js");
    //    inputScript(httpUrl + "/cdn/leaflet plugins/label.CircleMarker.Label.js");
    //    inputScript(httpUrl + "/cdn/leaflet plugins/label.Path.Label.js");
    //    inputScript(httpUrl + "/cdn/leaflet plugins/label.Map.Label.js");
    //    inputScript(httpUrl + "/cdn/leaflet plugins/label.FeatureGroup.Label.js");
    // }
    // if (inArray(includes, 'popup')) {
    //    inputCSS(httpUrl + "/cdn/leaflet plugins/leaflet.responsive.popup.css");
    //    inputScript(httpUrl + "/cdn/leaflet plugins/leaflet.responsive.popup.js");
    // }
  }

  load();
  window.isLocal = false;
  window.server = document.location.toString().match(/file:\/\//) ? "http://localhost:8800" : 'http://' + document.location.host;
})();
