import * as M from '@s7n/math';
import { Entity2D, EntityUtils } from '../../entity-2d';

export function hitEnityTest(entity: Entity2D, point: M.Vector2) {
    if(EntityUtils.isShapeEntity(entity)) {
        return hitShapeTest(entity, point);
    }else if(EntityUtils.isRenderTree(entity)) {
        return true;
    }

    return false;
}

function hitShapeTest(entity: Entity2D, point: M.Vector2) {
    if(EntityUtils.isArc(entity)) {

        const mArc = new M.Arc(entity.getCenter(), entity.radius, entity.startAngle, entity.endAngle, entity.counterclockwise);
        return mArc.isPointOnArc(point);

    }else if (EntityUtils.isBezierCurve(entity)) {
        // TODO 支持在贝塞尔曲线上的判断
        return false;
    }else if(EntityUtils.isEllipse(entity)) {

        const mEllipse = new M.Ellipse(entity.getCenter(), entity.radiusX, entity.radiusY, entity.rotation);
        return mEllipse.isPointInsideEllipse(point)

    }else if(EntityUtils.isCircle(entity)) {

        const mCircle = new M.Circle(entity.getCenter(), entity.radius);
        return mCircle.isPointInsideCircle(point, true);

    }else if( EntityUtils.isLine(entity)) {

        const mLine = new M.Line2().setStart(entity.getStart()).setEnd(entity.getEnd());
        return mLine.isPointOnSegment(point);

    }else if(EntityUtils.isPolygon(entity)) {

        const mPolygon = new M.Polygon(entity.getPathData());
        return mPolygon.isPointInsidePolygon(point);

    }else if (EntityUtils.isRect(entity)) {

        const { x, y, width, height } = entity;
        const mRect = M.Box2.createByGeometry(new M.Vector2(x + width / 2, y + height / 2), new M.Vector2(width, height));
        return mRect.isPointInBox(point);

    } else if (EntityUtils.isSector(entity)) {

        const mArc = new M.Arc(entity.getCenter(), entity.radius, entity.startAngle, entity.endAngle, entity.counterclockwise);
        return mArc.isPointInsideArc(point);

    }

    return false;
}