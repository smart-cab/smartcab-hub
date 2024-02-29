from flask import  request, Blueprint
from smartcab.data import db
from smartcab.data.eval_types import EvalType
from smartcab.data.lessons import Lesson


blueprint = Blueprint(
    name="statistic", 
    import_name=__name__
)


def write_new_vote_to_db(vote: str):
    with db.session() as db_sess:
        type_id = db_sess.query(EvalType).filter(EvalType.eval_type == vote).first().id
        db_sess.add(Lesson(eval_id=type_id))
        db_sess.commit()


# def get_grade_statistics() -> list[dict[str, int | str]]:
#     with db.session() as db_sess:
#         print(db_sess.query(EvalType))


@blueprint.route("/new_vote", methods=["GET", "POST"])
def new_vote():
    vote = str(request.args.get("vote"))
    use_db.write_new_vote_to_db(vote)
    return {"status": "ok"}
