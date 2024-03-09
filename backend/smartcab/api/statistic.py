import datetime
from flask import  request, Blueprint
from sqlalchemy_serializer.serializer import logging
from smartcab.data import db
from smartcab.data.eval_types import EvalType
from smartcab.data.lessons import Lesson


blueprint = Blueprint(
    name="statistic", 
    import_name=__name__
)


@blueprint.route("/new_vote", methods=["GET", "POST"])
def new_vote():
    vote = request.get_json()["params"]["vote"]
    with db.session() as db_sess:
        try:
            type_id = db_sess.query(EvalType).filter(EvalType.label == vote).first().id
        except AttributeError:
            logging.error(f"Not find '{vote}' in eval_types table when doing new vote")
            return {"status": "error: incorrect evaluation type"}
        db_sess.add(Lesson(eval_id=type_id))
        db_sess.commit()
        
    return {"status": "ok"}


@blueprint.route("/get_statistic/lesson_grade/group_by_category")
def get_statistic_grouping_by_category() -> dict:
    period = str(request.args.get("period"))
    result = {}
    with db.session() as db_sess:
        for eval_type in db_sess.query(EvalType).all():
            grade_entries = db_sess.query(Lesson).filter(Lesson.eval_id == eval_type.id)
            try: 
                data_acquisition_boundary = datetime.date.today() - datetime.timedelta(days=int(period))
                grade_entries = grade_entries.filter(Lesson.created_at >= data_acquisition_boundary)
            except ValueError:
                if period != "*":
                    logging.error("Invalid period in get lesson grade group by cagtegory")
                    return {"status": "error: invalid period in get lesson grade group by cagtegory"}
            result[eval_type.label] = grade_entries.count()

    return {"status": "ok"} | result


# @blueprint.route("/get_statistic/lesson_grade/group_by_category_on_time_slot")
# def get_statistic_by_category_on_time_slot():
#     try: 
#         slot_size = int(request.args.get("slot_size"))
#         slot_count = int(request.args.get("slot_count"))
#     except ValueError: 
#         logging.error("Invalid slot parameters")
#         return {"satus": "error: invalid slot parameters"}
#     result = {"slots": []}
#     with db.session() as db_sess:
#         for _ in range(slot_count):
#             result["slots"].append(
#                 ...
#             )
#         
#
#
#     return {"status": "ok"}
#
