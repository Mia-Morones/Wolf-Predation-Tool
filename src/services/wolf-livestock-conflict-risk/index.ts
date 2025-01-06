import { Point, Polygon } from '@arcgis/core/geometry';
import { IFeature } from '@esri/arcgis-rest-feature-service';

const WOLF_LIVESTOCK_CONFLICT_RISK_SERVICE_URL =
    'https://services1.arcgis.com/hLJbHVT9ZrDIzK0I/arcgis/rest/services/WolfAppMapHexagons_WFL1/FeatureServer/3';

enum WOLF_LIVESTOCK_CONFLICT_RISK_FIELD_NAMES {
    objectId = 'OBJECTID',
    gridId = 'GRID_ID',
    probability = 'mean_PROB',
    cattleDensity = 'cattle_density ',
}

type WolfLivestockConflictRiskFeature = {
    // objectId: number;
    // gridId: number;
    // cattleDensity: number;
    probability: number;
};

export const queryAverageWolfLivestockConflict = async (
    geometry: Point | Polygon,
    geometryType: 'esriGeometryPolygon' | 'esriGeometryPoint'
): Promise<WolfLivestockConflictRiskFeature[]> => {
    // const geometryType =
    //     (geometry as Polygon)?.rings !== undefined
    //         ? 'esriGeometryPolygon'
    //         : 'esriGeometryPoint';

    const queryParams = new URLSearchParams({
        f: 'json',
        geometry: JSON.stringify(geometry),
        geometryType,
        inSR: '4326',
        outStatistics: JSON.stringify([
            {
                statisticType: 'avg',
                onStatisticField:
                    WOLF_LIVESTOCK_CONFLICT_RISK_FIELD_NAMES.probability,
                outStatisticFieldName:
                    WOLF_LIVESTOCK_CONFLICT_RISK_FIELD_NAMES.probability,
            },
        ]),
        spatialRel: 'esriSpatialRelIntersects',
        returnGeometry: 'false',
    });

    const response = await fetch(
        `${WOLF_LIVESTOCK_CONFLICT_RISK_SERVICE_URL}/query?${queryParams.toString()}`
    );

    const data = await response.json();

    if (data.error) {
        throw new Error(data.error.message);
    }

    if (!Array.isArray(data.features) || data.features.length === 0) {
        return [];
    }

    return data.features.map((feature: IFeature) => {
        const { attributes } = feature;

        return {
            // objectid:
            //     attributes[WOLF_LIVESTOCK_CONFLICT_RISK_FIELD_NAMES.objectId],
            probability:
                attributes[
                    WOLF_LIVESTOCK_CONFLICT_RISK_FIELD_NAMES.probability
                ],
            // gridId: attributes[WOLF_LIVESTOCK_CONFLICT_RISK_FIELD_NAMES.gridId],
            // cattleDensity:
            //     attributes[
            //         WOLF_LIVESTOCK_CONFLICT_RISK_FIELD_NAMES.cattleDensity
            //     ],
        };
    });
};
