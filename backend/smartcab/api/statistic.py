import datetime
import logging
import os
from pandas import ExcelWriter, read_sql
from flask import  Response, request, Blueprint, send_file
from sqlalchemy import inspect, create_engine
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


@blueprint.route("/export_statistics")
def export_statistics() -> Response:
    engine = create_engine(db.get_db_url())
    table_names = inspect(engine).get_table_names()
    excel_file_path = 'db/dump.xlsx'
    with ExcelWriter(excel_file_path) as writer:
        for table_name in table_names:
            query = f"SELECT * FROM {table_name}"
            df = read_sql(query, engine)
            df.to_excel(writer, sheet_name=table_name, index=False)
    return send_file(f"../{excel_file_path}", as_attachment=True)


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

    return {"status": "ok"} | {"data": result}



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
