#!/bin/bash
# $1 = Index

INDEX=$1

CUR_DIR=$(pwd)$'/src/'
WORK_DIR=$(pwd)$'/dist/'

OLD_SUB="----"
OLD_TYPE="xxxx"

mkdir -p $WORK_DIR > /dev/null 2>&1
cp $CUR_DIR"BENSYC_VECTOR_OVERLAY.svg" $WORK_DIR"BENSYC_VECTOR_OVERLAY_"$INDEX".svg"

NEW_SUB=$INDEX
NEW_TYPE=$(python3 $CUR_DIR"rarity.py" $INDEX)

sed -i '' "s/$OLD_SUB/$NEW_SUB/g" $WORK_DIR"BENSYC_VECTOR_OVERLAY_"$INDEX".svg"
sed -i '' "s/$OLD_TYPE/$NEW_TYPE/g" $WORK_DIR"BENSYC_VECTOR_OVERLAY_"$INDEX".svg"

inkscape -d 20 --export-area-page $WORK_DIR"BENSYC_VECTOR_OVERLAY_"$INDEX".svg" -o $WORK_DIR"BENSYC_VECTOR_OVERLAY_"$INDEX".png" > /dev/null 2>&1

mv $CUR_DIR"../BENSYC_VECTOR_OVERLAY_"$INDEX".png" $WORK_DIR"png/"$INDEX".png"
mv $WORK_DIR"BENSYC_VECTOR_OVERLAY_"$INDEX".svg" $WORK_DIR"svg/"$INDEX".svg"

pin=$(ipfs add $WORK_DIR"png/"$INDEX".png")
cid=$(echo $pin | awk '{ print $2 }')
printf $cid$' '$NEW_TYPE
