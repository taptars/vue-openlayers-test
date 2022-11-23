<template>
  <div>
    <div id="map" class="map"></div>
    <div ref="popup" class="popup" v-show="shopPopup">
      <div class="info">
        <ul>
          <li>信息1：xxx</li>
          <li>信息2：xxx</li>
          <li>信息3：xxx</li>
        </ul>
      </div>
    </div>
    <div id="layerControl" class="layerControl">
      <div class="title"><label>图层列表</label></div>
      <ul id="layerTree" class="layerTree"></ul>
    </div>
  </div>
</template>

<script>
import { Feature, Map, View, Overlay } from "ol";
import * as olProj from "ol/proj";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { GeoJSON } from "ol/format";
import { Point, Circle } from "ol/geom";
import { Style, Fill, Stroke, Circle as sCircle } from "ol/style";

export default {
  name: "Map",
  data() {
    return {
      openMap: null,
      shopPopup: false,
      popup: null,
    };
  },
  created() {
    console.log("map---created");
  },
  mounted() {
    console.log("map---mounted");
    this.initMap();
  },
  methods: {
    initMap() {
      this.openMap = new Map({
        target: "map",
        layers: [
          new TileLayer({
            source: new XYZ({
              url: "https://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}",
            }),
            name: "高德瓦片图层",
          }),
          // new TileLayer({
          //   source: new OSM(),
          // }),
        ],
        view: new View({
          // 将西安作为地图中心
          center: olProj.fromLonLat([108.945951, 34.465262]),
          zoom: 4,
        }),
        controls: [],
      });
      this.addCircle();
      this.add();
      this.addLine();
      this.singleclick();
      this.pointermove();
      this.addOverlay();
      this.loadLayersControl();
    },

    // 设置圆点图层
    addCircle() {
      const style = new Style({
        image: new sCircle({
          radius: 10,
          stroke: new Stroke({
            color: "#fff",
          }),
          fill: new Fill({
            color: "#3399CC",
          }),
        }),
      });

      const feature = new Feature({
        geometry: new Point(olProj.fromLonLat([108.945951, 34.465262])),
      });

      feature.setStyle(style);

      const circleLayer = new VectorLayer({
        source: new VectorSource({
          features: [feature],
        }),
        name: "圆点图层",
      });

      console.log("circleLayer", circleLayer);

      this.openMap.addLayer(circleLayer);
    },

    // 设置图层
    add() {
      const styles = {
        Point: new Style({
          image: new sCircle({
            radius: 5,
            fill: null,
            stroke: new Stroke({ color: "red", width: 1 }),
          }),
        }),
        LineString: new Style({
          stroke: new Stroke({
            color: "green",
            width: 1,
          }),
        }),
        MultiLineString: new Style({
          stroke: new Stroke({
            color: "green",
            width: 1,
          }),
        }),
        MultiPoint: new Style({
          image: new sCircle({
            radius: 5,
            fill: null,
            stroke: new Stroke({ color: "red", width: 1 }),
          }),
        }),
        MultiPolygon: new Style({
          stroke: new Stroke({
            color: "yellow",
            width: 1,
          }),
          fill: new Fill({
            color: "rgba(255, 255, 0, 0.1)",
          }),
        }),
        // 多边形
        Polygon: new Style({
          stroke: new Stroke({
            color: "blue",
            lineDash: [4],
            width: 3,
          }),
          fill: new Fill({
            color: "rgba(0, 0, 255, 0.1)",
          }),
        }),
        GeometryCollection: new Style({
          stroke: new Stroke({
            color: "magenta",
            width: 2,
          }),
          fill: new Fill({
            color: "magenta",
          }),
          image: new sCircle({
            radius: 10,
            fill: null,
            stroke: new Stroke({
              color: "magenta",
            }),
          }),
        }),
        Circle: new Style({
          stroke: new Stroke({
            color: "red",
            width: 2,
          }),
          fill: new Fill({
            color: "rgba(255,0,0,0.2)",
          }),
        }),
      };

      const styleFunction = function (feature) {
        return styles[feature.getGeometry().getType()];
      };

      const geojsonObject = {
        type: "FeatureCollection",
        crs: {
          type: "name",
          properties: {
            name: "EPSG:3857",
          },
        },
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [0, 0],
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [4e6, -2e6],
                [8e6, 2e6],
              ],
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [4e6, 2e6],
                [8e6, -2e6],
              ],
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [-5e6, -1e6],
                  [-3e6, -1e6],
                  [-4e6, 1e6],
                  [-5e6, -1e6],
                ],
              ],
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "MultiLineString",
              coordinates: [
                [
                  [-1e6, -7.5e5],
                  [-1e6, 7.5e5],
                ],
                [
                  [1e6, -7.5e5],
                  [1e6, 7.5e5],
                ],
                [
                  [-7.5e5, -1e6],
                  [7.5e5, -1e6],
                ],
                [
                  [-7.5e5, 1e6],
                  [7.5e5, 1e6],
                ],
              ],
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "MultiPolygon",
              coordinates: [
                [
                  [
                    [-5e6, 6e6],
                    [-3e6, 6e6],
                    [-3e6, 8e6],
                    [-5e6, 8e6],
                    [-5e6, 6e6],
                  ],
                ],
                [
                  [
                    [-2e6, 6e6],
                    [0, 6e6],
                    [0, 8e6],
                    [-2e6, 8e6],
                    [-2e6, 6e6],
                  ],
                ],
                [
                  [
                    [1e6, 6e6],
                    [3e6, 6e6],
                    [3e6, 8e6],
                    [1e6, 8e6],
                    [1e6, 6e6],
                  ],
                ],
              ],
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "GeometryCollection",
              geometries: [
                {
                  type: "LineString",
                  coordinates: [
                    [-5e6, -5e6],
                    [0, -5e6],
                  ],
                },
                {
                  type: "Point",
                  coordinates: [4e6, -5e6],
                },
                {
                  type: "Polygon",
                  coordinates: [
                    [
                      [1e6, -6e6],
                      [3e6, -6e6],
                      [2e6, -4e6],
                      [1e6, -6e6],
                    ],
                  ],
                },
              ],
            },
          },
        ],
      };

      const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(geojsonObject),
      });

      // console.log('geojsonObject', geojsonObject);
      // console.log('geojsonObject2222', new GeoJSON().readFeatures(geojsonObject));

      vectorSource.addFeature(new Feature(new Circle([5e6, 7e6], 1e6)));

      const vectorLayer = new VectorLayer({
        source: vectorSource,
        name: "多个图层",
        style: styleFunction,
      });

      console.log("vectorLayer", vectorLayer);

      this.openMap.addLayer(vectorLayer);
    },

    // 设置线图层
    addLine() {
      const styles = {
        LineString: new Style({
          stroke: new Stroke({
            color: "red",
            width: 2,
          }),
        }),
        MultiLineString: new Style({
          stroke: new Stroke({
            color: "green",
            width: 1,
          }),
        }),
        GeometryCollection: new Style({
          stroke: new Stroke({
            color: "magenta",
            width: 2,
          }),
          fill: new Fill({
            color: "magenta",
          }),
          image: new Circle({
            radius: 10,
            fill: null,
            stroke: new Stroke({
              color: "magenta",
            }),
          }),
        }),
      };

      const styleFunction = function (feature) {
        return styles[feature.getGeometry().getType()];
      };

      const geojsonObject = {
        type: "FeatureCollection",
        crs: {
          type: "name",
          properties: {
            name: "EPSG:3857",
          },
        },
        features: [
          {
            type: "Feature",
            id: 1,
            geometry: {
              type: "LineString",
              coordinates: [
                [104.100974, 30.468943],
                [104.10046, 30.524877],
                [104.036587, 30.524331],
                [104.037139, 30.468401],
                [104.100974, 30.468943],
              ],
            },
          },
          {
            type: "Feature",
            id: 2,
            geometry: {
              type: "LineString",
              coordinates: [
                [104.149681, 30.443063],
                [103.988719, 30.441731],
                [103.990665, 30.55065],
                [104.146197, 30.55],
                [104.149681, 30.443063],
              ],
            },
          },
          {
            type: "Feature",
            id: 3,
            geometry: {
              type: "LineString",
              coordinates: [
                [104.057501, 30.48169],
                [104.080117, 30.48169],
                [104.079834, 30.511821],
                [104.057501, 30.511629],
                [104.057501, 30.48169],
              ],
            },
          },
        ],
      };

      const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(geojsonObject, {
          dataProjection: "EPSG:4326", // geojson 的坐标系
          featureProjection: "EPSG:3857", // 输出的坐标系
        }),
      });
      const vectorLayer = new VectorLayer({
        source: vectorSource,
        name: "线图层",
        style: styleFunction,
      });
      this.openMap.addLayer(vectorLayer);
    },

    singleclick() {
      this.openMap.on("singleclick", (e) => {
        const feature = this.openMap.forEachFeatureAtPixel(
          e.pixel,
          (feature) => feature
        );
        if (feature) {
          this.shopPopup = true;
          // 设置弹窗位置
          let coordinates = feature.getGeometry().getCoordinates();
          this.popup.setPosition(coordinates);
        } else {
          this.shopPopup = false;
        }
      });
    },

    // 加载图层列表数据
    loadLayersControl() {
      const layer = []; //map中的图层数组
      const layerName = []; //图层名称数组
      const layerVisibility = []; //图层可见属性数组

      const layers = this.openMap.getLayers();
      console.log("layers", layers);
      const layersLength = layers.getLength();

      const treeContent = document.getElementById("layerTree"); //图层目录容器

      for (let i = 0; i < layersLength; i++) {
        //获取每个图层、名称、是否可见属性
        layer[i] = layers.item(i);
        layerName[i] = layer[i].get("name");
        layerVisibility[i] = layer[i].getVisible();
        //新增li元素，用来承载图层项
        const elementLi = document.createElement("li");
        treeContent.appendChild(elementLi); // 添加子节点
        //创建复选框元素
        const elementInput = document.createElement("input");
        elementInput.type = "checkbox";
        elementInput.name = "layers";
        elementLi.appendChild(elementInput);
        //创建label元素
        const elementLable = document.createElement("label");
        elementLable.className = "layer";
        //设置图层名称
        this.setInnerText(elementLable, layerName[i]);
        elementLi.appendChild(elementLable);
        //设置图层默认显示状态
        if (layerVisibility[i]) {
          elementInput.checked = true;
        }
        this.addChangeEvent(elementInput, layer[i]); //为checkbox添加变更事件
      }
    },

    /**
     * 为checkbox元素绑定变更事件
     * @param {input} element checkbox元素
     * @param {ol.layer.Layer} layer 图层对象
     */
    addChangeEvent(element, layer) {
      element.onclick = function () {
        if (element.checked) {
          layer.setVisible(true); //显示图层
        } else {
          layer.setVisible(false); //不显示图层
        }
      };
    },

    // 动态设置元素文本内容（兼容）
    setInnerText(element, text) {
      if (typeof element.textContent == "string") {
        element.textContent = text;
      } else {
        element.innerText = text;
      }
    },

    addOverlay() {
      // 创建Overlay
      let elPopup = this.$refs.popup;
      console.log(this.$refs.popup);
      this.popup = new Overlay({
        element: elPopup,
        positioning: "bottom-center",
        stopEvent: false,
        offset: [0, -20],
      });
      this.openMap.addOverlay(this.popup);
    },

    pointermove() {
      this.openMap.on("pointermove", (e) => {
        if (this.openMap.hasFeatureAtPixel(e.pixel)) {
          this.openMap.getViewport().style.cursor = "pointer";
        } else {
          this.openMap.getViewport().style.cursor = "inherit";
        }
      });
    },
  },
};
</script>

<style scoped>
.map {
  width: calc(100vw - 230px);
  height: calc(100vh - 110px);
  background: rgba(135, 206, 235, 0.2);
}
.popup {
  width: 200px;
  background-color: white;
  padding: 18px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgb(177, 177, 177);
}
.popup .info {
  font-size: 14px;
  text-align: left;
}
ul {
  padding-left: 0;
}
.layerControl {
  position: absolute;
  bottom: 5px;
  min-width: 200px;
  max-height: 200px;
  right: 0px;
  top: 5px;
  z-index: 2001;
  /*在地图容器中的层，要设置z-index的值让其显示在地图上层*/
  color: #ffffff;
  background-color: #4c4e5a;
  border-width: 10px;
  /*边缘的宽度*/
  border-radius: 10px;
  /*圆角的大小 */
  border-color: #000 #000 #000 #000;
  /*边框颜色*/
}
.layerControl .title {
  font-weight: bold;
  font-size: 15px;
  margin: 10px;
}
.layerTree {
  list-style: none;
}
</style>