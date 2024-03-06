from flask import  request, Blueprint
from smartcab.data import db
from smartcab.data.eval_types import EvalType
from smartcab.data.lessons import Lesson


blueprint = Blueprint(
    name="statistic", 
    import_name=__name__
)


@blueprint.route("/new_vote", methods=["GET", "POST"])
def new_vote():
    vote = str(request.args.get("vote"))
    print("----------------", vote)
    with db.session() as db_sess:
        type_id = db_sess.query(EvalType).filter(EvalType.label == vote).first().id
        db_sess.add(Lesson(eval_id=type_id))
        db_sess.commit()
        
    return {"status": "ok"}


@blueprint.route("/get_statistic/<selection_type>")
def get_statistic(selection_type):
    period = str(request.args.get("period"))
    result = {}
    match selection_type:
        case "by_groups":
            result = _get_statistic_by_group(period)
    return {"status": "ok"} | result


def _get_statistic_by_group(period: str) -> dict:
    if period == "all":
        with db.session() as db_sess:
            for eval_type in db_sess.query(EvalType).all():
                print(db_sess.query(Lesson).filter(EvalType.label == eval_type.label).count())

# get_statistic
#     group_count
#         all
#         last_week
#         last_mounth
#     timeline
