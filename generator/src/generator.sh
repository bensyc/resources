#!/bin/bash
# $1 = Index

INDEX=$1

CUR_DIR=$(pwd)$'/src/'
WORK_DIR=$(pwd)$'/dist/'

OLD_SUB="----"
OLD_TYPE="xxxx"

mkdir -p $WORK_DIR $WORK_DIR$'png' $WORK_DIR$'svg' $WORK_DIR$'json' > /dev/null 2>&1
cp $CUR_DIR"BENSYC_VECTOR_OVERLAY.svg" $WORK_DIR"BENSYC_VECTOR_OVERLAY_"$INDEX".svg"

NEW_SUB=$INDEX
NEW_TYPE=$(python3 $CUR_DIR"rarity.py" $INDEX)

sed -i '' "s/$OLD_SUB/$NEW_SUB/g" $WORK_DIR"BENSYC_VECTOR_OVERLAY_"$INDEX".svg"
sed -i '' "s/$OLD_TYPE/$NEW_TYPE/g" $WORK_DIR"BENSYC_VECTOR_OVERLAY_"$INDEX".svg"

mv $WORK_DIR"BENSYC_VECTOR_OVERLAY_"$INDEX".svg" $WORK_DIR"svg/"$INDEX".svg"

inkscape -d 20 --export-area-page $WORK_DIR"svg/"$INDEX".svg" -o $INDEX".png" > /dev/null 2>&1

mv $WORK_DIR"../"$INDEX".png" $WORK_DIR"png/"$INDEX".png"

pin=$(ipfs add $WORK_DIR"png/"$INDEX".png")
cid=$(echo $pin | awk '{ print $2 }')
printf $cid$' '$NEW_TYPE
